import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { CheckCircle, Star, Clock, BookOpen } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Course } from "@/lib/index";
import { getLevelLabel } from "@/lib/index";

interface ProductCardProps {
  title: string;
  description: string;
  price: string;
  features: string[];
  badge?: string;
  onContact: () => void;
}

export function ProductCard({ title, description, price, features, badge, onContact }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      className="relative"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm">
        {badge && (
          <Badge className="absolute top-4 right-4 bg-accent text-primary rounded-full px-3 py-1 text-xs font-bold">
            {badge}
          </Badge>
        )}
        <CardHeader>
          <CardTitle className="text-xl md:text-2xl font-semibold pr-20">{title}</CardTitle>
          <CardDescription className="text-sm md:text-base">{description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1 space-y-4">
          <div className="text-2xl md:text-3xl font-bold text-accent font-mono">{price}</div>
          <ul className="space-y-2">
            {features.map((feature, index) => (
              <li key={index} className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-accent shrink-0 mt-0.5" />
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </CardContent>
        <CardFooter>
          <Button onClick={onContact} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="lg">
            Quero Saber Mais
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}

interface TestimonialCardProps {
  name: string;
  role: string;
  company: string;
  text: string;
  rating: number;
}

export function TestimonialCard({ name, role, company, text, rating }: TestimonialCardProps) {
  const initials = name.split(' ').map(n => n[0]).join('').toUpperCase();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg transition-all duration-300">
        <CardHeader>
          <div className="flex gap-1 mb-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${i < rating ? 'fill-accent text-accent' : 'text-muted'}`}
              />
            ))}
          </div>
          <blockquote className="text-sm leading-relaxed italic text-foreground/90">
            "{text}"
          </blockquote>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-3">
            <Avatar className="w-12 h-12 border-2 border-accent/20 bg-accent/20">
              <AvatarFallback className="bg-accent/20 text-accent font-semibold">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-sm">{name}</p>
              <p className="text-xs text-muted-foreground">
                {role} • {company}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface StatCardProps {
  number: string | number;
  label: string;
  icon?: React.ReactNode;
}

export function StatCard({ number, label, icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-accent/5 border-border/50 hover:shadow-lg transition-all duration-300">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl md:text-4xl font-bold font-mono text-accent mb-1">{number}</p>
              <p className="text-xs md:text-sm text-muted-foreground font-medium">{label}</p>
            </div>
            {icon && <div className="text-accent/60">{icon}</div>}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

interface CourseCardProps {
  course: Course;
  enrolled?: boolean;
  progressPercent?: number;
}

export function CourseCard({ course, enrolled = false, progressPercent = 0 }: CourseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/courses/${course.slug}`);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.2 }}
      onClick={handleClick}
      className="cursor-pointer"
    >
      <Card className="h-full flex flex-col hover:shadow-xl transition-all duration-300 border-border/50 bg-card/50 backdrop-blur-sm overflow-hidden">
        <div className="relative aspect-video w-full overflow-hidden bg-primary/10">
          {course.thumbnail_url ? (
            <img
              src={course.thumbnail_url}
              alt={course.title}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <BookOpen className="w-12 h-12 text-muted-foreground" />
            </div>
          )}
          <Badge className="absolute top-3 left-3 bg-primary/90 text-primary-foreground">
            {getLevelLabel(course.level)}
          </Badge>
        </div>
        <CardHeader>
          <CardTitle className="text-base md:text-lg font-bold line-clamp-2">{course.title}</CardTitle>
          <CardDescription className="text-xs md:text-sm line-clamp-2">{course.description}</CardDescription>
        </CardHeader>
        <CardContent className="flex-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{course.total_hours}h</span>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-2">
          {enrolled && (
            <div className="w-full space-y-1">
              <Progress value={progressPercent} className="h-2" />
              <p className="text-xs text-muted-foreground text-right">{progressPercent}% concluído</p>
            </div>
          )}
          <Button className="w-full" variant={enrolled ? "default" : "outline"}>
            {enrolled ? 'Continuar' : 'Ver Curso'}
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}